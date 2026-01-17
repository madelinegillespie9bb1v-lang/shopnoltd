<?php
namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessagingController extends Controller
{
    public function index() { return Message::all(); }
    public function store(Request $request) { return Message::create($request->all()); }
}
