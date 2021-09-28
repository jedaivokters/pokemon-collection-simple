<?php

namespace App\Http\Controllers;

use App\Pokemons;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PokemonController extends Controller
{

	private $pokemon;
	private $response;

	/**
	 * TodoController constructor.
	 * 
	 * @param Todo $todo
	 */
	public function __construct(Pokemons $pokemon)
	{
		$this->pokemon = $pokemon;

		$this->response = [
			'message' => '',
			'data' => [],
			'errors' => null
		];
	}


	public function list(Request $request)
	{
		$query = $this->pokemon->select('id', 'name', 'nickname', 'metadata')->orderBy('id', 'desc')
			->addSelect(DB::raw('1 as ops, 1 as image'));

		$this->response['total'] = $query->count();

		if ($request->has('limit')) $query = $query->limit($request->limit);

		$this->response['data'] = $query->get();

		return response()->json($this->response);
	}

	public function detail(Request $request, $id)
	{
		$this->response['data'] = $this->pokemon->find($id);
		return response()->json($this->response);
	}

	public function store(Request $request)
	{
		$request->validate([
			'nickname' => 'required|max:100',
		], [
			"nickname.required" => __('common.nickname_required')
		]);

		$this->pokemon->create([
			'name' => $request->name,
			'nickname' => $request->nickname,
			'metadata' => $request->metadata,
			'name' => $request->name,
		]);

		return response()->json($this->response);
	}

	public function doUpdate(Request $request, $id)
	{
		$request->validate([
			'nickname' => 'required|max:100',
		], [
			"nickname.required" => __('common.nickname_required')
		]);

		$this->pokemon->whereId($id)->update([
			'nickname' => $request->nickname,
		]);

		return response()->json($this->response);
	}

	public function doDelete(Request $request, $id)
	{
		$this->pokemon->find($id)->delete();

		return response()->json($this->response);
	}
}
