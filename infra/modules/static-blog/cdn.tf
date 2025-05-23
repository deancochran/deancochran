resource "aws_cloudfront_distribution" "main" {
    origin {
    domain_name = aws_s3_bucket.main.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.main.id

        custom_origin_config {
            http_port              = 80
            https_port             = 443
            origin_protocol_policy = "http-only"
            origin_ssl_protocols   = ["TLSv1.2"]
        }
    }

    enabled             = true
    is_ipv6_enabled     = true
    comment             = "CDN for my website"
    default_root_object = "index.html"

    logging_config {
        bucket = aws_s3_bucket.cloudfront_logs.bucket_regional_domain_name
        prefix = "cloudfront-logs/"
        include_cookies = true
    }
    
    aliases             = [var.domain_name]

    default_cache_behavior {
        allowed_methods  = ["GET", "HEAD"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = aws_s3_bucket.main.id

        forwarded_values {
            query_string = false

            cookies {
                forward = "none"
        }
    }

    function_association {
        event_type   = "viewer-request"
        function_arn = aws_cloudfront_function.main.arn
    }

    viewer_protocol_policy = "redirect-to-https"
        min_ttl                = 0
        default_ttl            = 3600
        max_ttl                = 86400
    }

    restrictions {
        geo_restriction {
            restriction_type = "none"
        }
    }

    viewer_certificate {
        acm_certificate_arn = aws_acm_certificate.main.arn
        ssl_support_method  = "sni-only"
    }
    custom_error_response {
        error_caching_min_ttl = 0
        error_code = 404
        response_code = 200
        response_page_path = "/index.html"
    }

    custom_error_response {
        error_caching_min_ttl = 0
        error_code = 403
        response_code = 200
        response_page_path = "/index.html"
    }

}

resource "aws_cloudfront_function" "main" {
    name    = "dean-cochran"
    runtime = "cloudfront-js-2.0"
    publish = true
    code = <<EOF
        function handler(event) {
            var request = event.request;
            var uri = request.uri;

            // Handle the root URL specifically
            if (uri === '/') {
                request.uri = '/index.html';
            }
            // Replace trailing slash with .html if the URI ends with / and is not the root
            else if (uri.endsWith('/') && uri !== '/') {
                request.uri = uri.slice(0, -1) + '.html';
            } 
            // Add .html if the URI doesn't have a file extension
            else if (!uri.includes('.')) {
                request.uri += '.html';
            }

            return request;
        }
    EOF
}

