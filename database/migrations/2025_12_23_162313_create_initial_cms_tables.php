<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        //tbel roles
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name'); 
            $table->timestamps();
        });

        //update tbel users
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->after('id')->constrained();
        });

        //tbel kategori
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->timestamps();
        });

        //tbel artikel (pusdat)
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('category_id')->constrained(); 
            $table->string('slug')->unique();
            $table->enum('status', ['draft', 'pending', 'published']); 
            $table->integer('views')->default(0); 
            $table->timestamps();
        });

        //tbel translate
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('article_id')->constrained();
            $table->string('locale'); 
            $table->string('title');
            $table->text('content');
            $table->unique(['article_id', 'locale']); 
            $table->timestamps();
        });

    }

    public function down(): void {
        Schema::dropIfExists('articles');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('translations');
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn('role_id');
        });
    }
};