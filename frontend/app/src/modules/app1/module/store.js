import './pokemonApi' // Load the pokemon axios client instance

export default {
	namespaced: true,
	state: {
		pokemons: [
			{
				search: 'bulbasaur',
				name: 'Bulbasaur',
				text: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.',
				image_url: '/images/pokeball-thumb.png'
			},
			{
				search: 'pikachu',
				name: 'Pikachu',
				text: 'When several of these POKéMON gather, their electricity could build and cause lightning storms.',
				image_url: '/images/pokeball-thumb.png'
			},
			{
				search: 'psyduck',
				name: 'Psyduck',
				text: 'When its headache intensifies, it starts using strange powers. However, it has no recollection of its powers, so it always looks befuddled and bewildered.',
				image_url: '/images/pokeball-thumb.png'
			},
			{
				search: 'charmander',
				name: 'Charmander',
				text: 'Obviously prefers hot places. When it rains, steam is said to spout\nfrom the tip of its tail.',
				image_url: '/images/pokeball-thumb.png'
			}
		],
  	},
	getters: {},
	mutations: {
		pokemons(state, val) {
			state.pokemons = val;
		},
    },
	actions: {
		initialize ({ dispatch }) {
			console.info('Site initializing...')
			console.info('Site initialized.')
		}
	}
}