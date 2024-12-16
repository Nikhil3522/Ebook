<?php
$url = "https://roshan1.b-cdn.net/thumbnails/big-size/"; // CDN folder URL
$html = file_get_contents($url); // Get the HTML content of the folder listing

// Use regex or DOM parsing to extract file names from the listing
preg_match_all('/href="([^"]+)"/', $html, $matches);

$files = array_filter($matches[1], function($file) {
    return strpos($file, '.') !== false; // Filter for actual files
});

print_r($files); // Outputs an array of file names
