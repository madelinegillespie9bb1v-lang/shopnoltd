<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Job;

class DatabaseSeeder extends Seeder {
    public function run() {
        User::factory(5)->create();
        Job::factory(10)->create();
    }
}
