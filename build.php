<?php
// Start output buffering to control the display flow
ob_start();

// Initialize variables
$buildStarted = false;
$minifyScripts = false;
$buildType = '';
$buildResults = [];
$destination = 'build/';

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $buildStarted = true;
    
    if (isset($_POST['build_minimal'])) {
        $buildType = 'minimal';
        $minifyScripts = true;
    } elseif (isset($_POST['build_debug'])) {
        $buildType = 'debug';
        $minifyScripts = false;
    }
    
    // Create build directory if it doesn't exist
    if (!is_dir($destination)) {
        mkdir($destination, 0777, true);
        $buildResults[] = "Created build directory";
    }
    
    // Include image resizing functionality
    include('resize.php');
    $buildResults[] = "Processed image resizing";
    
    // Copy basic files
    $files = ['attribution.txt', 'bg.jpg', 'favicon.png', 'styles.css', 'index.html', 'chart.js', 'loadingscreen.js', 'updates.json', 'typing-effects.js'];
    
    foreach ($files as $file) {
        if (file_exists($file)) {
            copy($file, $destination . basename($file));
            $buildResults[] = "Copied: $file";
        } else {
            $buildResults[] = "Missing file: $file";
        }
    }

    
    // Copy .htaccess
    if (file_exists('build .htaccess')) {
        copy('build .htaccess', $destination . '.htaccess');
        $buildResults[] = "Copied: .htaccess";
    } else {
        $buildResults[] = "Missing file: build .htaccess";
    }
    
    // Copy image directories
    $imagesDir = [
        'sounds/', 'css/', 'images/', 'images/icons/128/', 'images/boost/', 
        'images/buildings/128/', 'images/casino/128/', 'images/pages/', 
        'images/stocks/', 'images/tooltips/achievements/448/', 
        'images/tooltips/upgrades/448/', 'images/tooltips/buildings/448/'
    ];
    
    foreach ($imagesDir as $dir) {
        if (is_dir($dir)) {
            copyFiles($dir, $destination . $dir);
            $buildResults[] = "Copied directory: $dir";
        } else {
            $buildResults[] = "Missing directory: $dir";
        }
    }
    
    // Process scripts
    $scripts = [
        'tooltip.js', 'virtual_keyboard.js', 'audio.js', 'save.js', 'words.js', 'story.js', 'code.js', 
        'buildings.js', 'achievements.js', 'arena.js', 'reports.js', 
        'wordle.js', 'stockmarket.js', 'hacker.js', 'arcade.js', 
        'casino.js', 'memory.js', 'script.js', 'upgrades.js', 
        'news.js', 'guild.js'
    ];
    
    $scriptContent = '';
    $missingScripts = [];
    
    foreach ($scripts as $script) {
        if (file_exists($script)) {
            $scriptContent .= file_get_contents($script) . "\n";
        } else {
            $missingScripts[] = $script;
        }
    }
    
    if (!empty($missingScripts)) {
        $buildResults[] = "Missing scripts: " . implode(", ", $missingScripts);
    } else {
        $buildResults[] = "All scripts found and processed";
    }
    
    // Process the scripts based on build type
    if ($minifyScripts) {
        $buildResults[] = "Starting script minification...";
        $url = 'https://www.toptal.com/developers/javascript-minifier/api/raw';
        
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => ["Content-Type: application/x-www-form-urlencoded"],
            CURLOPT_POSTFIELDS => http_build_query(["input" => $scriptContent]),
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false
        ]);
        
        $minified = curl_exec($ch);
        
        if ($minified === false) {
            $buildResults[] = "Error minifying: " . curl_error($ch);
        } else {
            $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            if ($responseCode == 200) {
                file_put_contents($destination . 'TypeIdle.js', $minified);
                $buildResults[] = "Scripts minified and saved (" . round(strlen($minified) / 1024, 2) . " KB)";
            } else {
                $buildResults[] = "Minification failed with code: $responseCode";
                // Fallback to unminified version
                file_put_contents($destination . 'TypeIdle.js', $scriptContent);
                $buildResults[] = "Saved unminified version as fallback";
            }
        }
        curl_close($ch);
    } else {
        file_put_contents($destination . 'TypeIdle.js', $scriptContent);
        $buildResults[] = "Saved unminified script (" . round(strlen($scriptContent) / 1024, 2) . " KB)";
    }
    
    $buildResults[] = "Build process complete! Type: " . ucfirst($buildType);
}

/**
 * Helper function to copy files from source to destination
 */
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

// Get the buffered content
$content = ob_get_clean();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TypeIdle Build Tool</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #ecf0f1;
            padding-bottom: 10px;
        }
        .build-options {
            display: flex;
            gap: 20px;
            margin: 30px 0;
        }
        .build-button {
            padding: 12px 24px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .build-minimal {
            background-color: #3498db;
            color: white;
        }
        .build-debug {
            background-color: #2ecc71;
            color: white;
        }
        .build-button:hover {
            opacity: 0.9;
        }
        .build-results {
            background-color: #f9f9f9;
            border-left: 4px solid #3498db;
            padding: 15px;
            margin-top: 20px;
        }
        .result-item {
            margin: 5px 0;
            padding: 3px 0;
        }
        .error {
            color: #e74c3c;
        }
        .success {
            color: #27ae60;
        }
    </style>
</head>
<body>
    <h1>TypeIdle Build Tool</h1>
    
    <?php if (!$buildStarted): ?>
        <p>Select a build option:</p>
        <form method="post">
            <div class="build-options">
                <button type="submit" name="build_minimal" class="build-button build-minimal">
                    Build Minimal (Minified)
                </button>
                <button type="submit" name="build_debug" class="build-button build-debug">
                    Build Debug (Unminified)
                </button>
            </div>
        </form>
    <?php else: ?>
        <div class="build-results">
            <h2>Build Results: <?php echo ucfirst($buildType); ?></h2>
            <?php foreach($buildResults as $result): ?>
                <?php 
                $class = '';
                if (strpos($result, 'Error') !== false || strpos($result, 'Missing') !== false) {
                    $class = 'error';
                } elseif (strpos($result, 'complete') !== false) {
                    $class = 'success';
                }
                ?>
                <div class="result-item <?php echo $class; ?>"><?php echo $result; ?></div>
            <?php endforeach; ?>
        </div>
        
        <p><a href="build.php">Build Another Version</a></p>
    <?php endif; ?>
    
    <?php if (!empty($content)): ?>
        <div class="debug-output">
            <?php echo $content; ?>
        </div>
    <?php endif; ?>
</body>
</html>