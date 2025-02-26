<?php
$MINIFY_SCRIPTS = false;
$destination = 'build/';

if (!is_dir($destination)) {
    mkdir($destination, 0777, true);
}
include('resize.php');

$files = ['attribution.txt', 'bg.jpg', 'favicon.png', 'styles.css', 'index.html', 'chart.js', 'loadingscreen.js', 'updates.json'];


foreach ($files as $file) {
    if (file_exists($file)) {
        copy($file, $destination . basename($file));
    } else {
        echo "File $file does not exist.\n";
    }
}

if (file_exists('build .htaccess')) {
    copy('build .htaccess', $destination . '.htaccess');
} else {
    echo "File build .htaccess does not exist.\n";
}

$imagesDir = ['sounds/', 'images/', 'images/icons/128/', 'images/boost/', 'images/buildings/128/', 'images/casino/128/', 'images/pages/', 'images/stocks/',
'images/tooltips/achievements/448/', 'images/tooltips/upgrades/448/', 'images/tooltips/buildings/448/'];


foreach ($imagesDir as $dir) {
    if (is_dir($dir)) {
        copyFiles($dir, $destination . $dir);
    } else {
        echo "Directory $dir does not exist.\n";
    }
}

function copyFiles($source, $destination) {
    if (!is_dir($destination)) {
        mkdir($destination, 0777, true);
    }
    
    $files = glob($source . '*');
    
    foreach ($files as $file) {
        if (is_file($file)) {
            copy($file, $destination . basename($file));
        }
    }
}

$scripts = [
    'tooltip.js', 'audio.js', 'save.js', 'words.js', 'story.js', 'code.js', 
    'buildings.js', 'achievements.js', 'arena.js', 'reports.js', 
    'wordle.js', 'stockmarket.js', 'hacker.js', 'arcade.js', 
    'casino.js', 'memory.js', 'script.js', 'upgrades.js', 
    'news.js', 'guild.js'
];

$scriptContent = '';

foreach ($scripts as $script) {
    if (file_exists($script)) {
        $scriptContent .= file_get_contents($script) . "\n";
    } else {
        echo "Script $script does not exist.\n";
    }
}


if ($MINIFY_SCRIPTS) {
    $url = 'https://www.toptal.com/developers/javascript-minifier/api/raw';
    
    // init the request, set various options, and send it
    $ch = curl_init();
    
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ["Content-Type: application/x-www-form-urlencoded"],
        CURLOPT_POSTFIELDS => http_build_query([ "input" => $scriptContent ]),
        CURLOPT_SSL_VERIFYPEER => false, // Disable SSL verification
        CURLOPT_SSL_VERIFYHOST => false  // Disable SSL verification
    ]);
    
    $minified = curl_exec($ch);
    
    if ($minified === false) {
        echo 'cURL Error: ' . curl_error($ch) . "\n";
    } else {
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        echo "Response Code: " . $responseCode . "\n";
    }
    
    // finally, close the request
    curl_close($ch);
    
    
    file_put_contents($destination . 'TypeIdle.js', $minified);
} else {
    file_put_contents($destination . 'TypeIdle.js', $scriptContent);
}
?>