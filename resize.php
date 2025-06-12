<?php
// This script resizes images to a specified size. It is used to resize images to a smaller size for the game.
// The script is not used in the game itself, but is used in the build process to prepare images for the game.


// Function to resize images
function image_resize($src, $dst, $width, $height, $crop=0){
    
    if(!list($w, $h) = getimagesize($src)) return "Unsupported picture type!";
    
    $type = strtolower(substr(strrchr($src,"."),1));
    if($type == 'jpeg') $type = 'jpg';
    switch($type){
        case 'bmp': $img = imagecreatefromwbmp($src); break;
        case 'gif': $img = imagecreatefromgif($src); break;
        case 'jpg': $img = imagecreatefromjpeg($src); break;
        case 'png': $img = imagecreatefrompng($src); break;
        case 'webp': $img = imagecreatefromwebp($src); break;
        default : return "Unsupported picture type!";
    }
    
    // resize
    if($crop){
        if($w < $width or $h < $height) return "Picture is too small!";
        $ratio = max($width/$w, $height/$h);
        $h = $height / $ratio;
        $x = ($w - $width / $ratio) / 2;
        $w = $width / $ratio;
    }
    else{
        if($w < $width and $h < $height) return "Picture is too small!";
        $ratio = min($width/$w, $height/$h);
        $width = $w * $ratio;
        $height = $h * $ratio;
        $x = 0;
    }
    
    $new = imagecreatetruecolor($width, $height);
    
    // preserve transparency
    if($type == "gif" or $type == "png" or $type == "webp"){
        imagecolortransparent($new, imagecolorallocatealpha($new, 0, 0, 0, 127));
        imagealphablending($new, false);
        imagesavealpha($new, true);
    }
    imagecopyresampled($new, $img, 0, 0, $x, 0, $width, $height, $w, $h);
    
    switch($type){
        case 'bmp': imagewbmp($new, $dst); break;
        case 'gif': imagegif($new, $dst); break;
        case 'jpg': imagejpeg($new, $dst); break;
        case 'png': imagepng($new, $dst); break;
        case 'webp': imagewebp($new, $dst); break;
    }
    return true;
}

// Resize all buildings to 128x128 pixels
$src = "./images/buildings/";
$dst = "./images/buildings/128/";
$width = 128;
$height = 128;
$files = glob($src."*.*");
foreach($files as $file){
    $file_name = basename($file);
    if (file_exists($dst.$file_name)) {
        echo $file_name . " already exists.\n";
        continue;
    }
    if (true !== ($pic_error = @image_resize($file, $dst.$file_name, $width, $height, 1))) {
        echo $file_name . ": " . $pic_error . "\n";
    }
    else echo $file_name . " resized to 128x128 pixels.\n";
}

// Resize all achievements from 1729x1024 to 448x256 pixels
$src = "images/tooltips/achievements/";
$dst = "images/tooltips/achievements/448/";
$width = 448;
$height = 256;
$files = glob($src."*.*");
foreach($files as $file){
    $file_name = basename($file);
    if (file_exists($dst.$file_name)) {
        echo $file_name . " already exists.\n";
        continue;
    }
    if (true !== ($pic_error = @image_resize($file, $dst.$file_name, $width, $height, 1))) {
        echo $file_name . ": " . $pic_error . "\n";
    }
    else echo $file_name . " resized to 448x256 pixels.\n";
}

// Resize all upgrades from 1729x1024 to 448x256 pixels
$src = "images/tooltips/upgrades/";
$dst = "images/tooltips/upgrades/448/";
$width = 448;
$height = 256;
$files = glob($src."*.*");
foreach($files as $file){
    $file_name = basename($file);
    if (file_exists($dst.$file_name)) {
        echo $file_name . " already exists.\n";
        continue;
    }
    if (true !== ($pic_error = @image_resize($file, $dst.$file_name, $width, $height, 1))) {
        echo $file_name . ": " . $pic_error . "\n";
    }
    else echo $file_name . " resized to 448x256 pixels.\n";
}

// Resize all building tooltips from 1729x1024 to 448x256 pixels
$src = "images/tooltips/buildings/";
$dst = "images/tooltips/buildings/448/";
$width = 448;
$height = 256;
$files = glob($src."*.*");
foreach($files as $file){
    $file_name = basename($file);
    if (file_exists($dst.$file_name)) {
        echo $file_name . " already exists.\n";
        continue;
    }
    if (true !== ($pic_error = @image_resize($file, $dst.$file_name, $width, $height, 1))) {
        echo $file_name . ": " . $pic_error . "\n";
    }
    else echo $file_name . " resized to 448x256 pixels.\n";
}

// Resize all casino icons to 128x128 pixels
$src = "images/casino/";
$dst = "images/casino/128/";
$width = 128;
$height = 128;
$files = glob($src."*.*");
foreach($files as $file){
    $file_name = basename($file);
    if (file_exists($dst.$file_name)) {
        echo $file_name . " already exists.\n";
        continue;
    }
    if (true !== ($pic_error = @image_resize($file, $dst.$file_name, $width, $height, 1))) {
        echo $file_name . ": " . $pic_error . "\n";
    }
    else echo $file_name . " resized to 128x128 pixels.\n";
}

// Resize all generic icons to 128x128 pixels
$src = "images/icons/";
$dst = "images/icons/128/";
$width = 128;
$height = 128;
$files = glob($src."*.*");
foreach($files as $file){
    $file_name = basename($file);
    if (file_exists($dst.$file_name)) {
        echo $file_name . " already exists.\n";
        continue;
    }
    if (true !== ($pic_error = @image_resize($file, $dst.$file_name, $width, $height, 1))) {
        echo $file_name . ": " . $pic_error . "\n";
    }
    else echo $file_name . " resized to 128x128 pixels.\n";
}

?>