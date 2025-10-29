<?php
namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index() { return Job::all(); }
    public function store(Request $request) { return Job::create($request->all()); }
    public function approve($id) { $job = Job::find($id); $job->status='approved'; $job->save(); return $job; }
}
