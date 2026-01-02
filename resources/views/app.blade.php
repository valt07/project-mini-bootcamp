<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>HeadlineCore CMS</title>
        @viteReactRefresh
        @vite(['resources/js/app.jsx', 'resources/css/app.css'])
    </head>
    <body class="font-sans antialiased bg-gray-50 text-gray-900">
        <div id="app"></div>
    </body>
</html>
