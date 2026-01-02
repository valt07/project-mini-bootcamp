<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>CMS Berita - Bootcamp</title>

    @viteReactRefresh
    @vite(['resources/js/main.jsx', 'resources/css/app.css'])
</head>
<body class="bg-gray-900 font-sans antialiased text-white">
    <div id="app"></div>
</body>
</html>