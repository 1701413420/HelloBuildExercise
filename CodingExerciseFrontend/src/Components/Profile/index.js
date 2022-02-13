import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_USER_DATA } from "../../GraphQL/queries";
import { useQuery } from "@apollo/client";
import Repository from './Repository';
import { getFavorites, postFavorite } from '../../Api/api';

function Profile() {
	const { loading, error, data, fetchMore } = useQuery(GET_USER_DATA);
	const navigate = useNavigate();
	const [user, setUser] = useState('');
	const [loadingMore, setLoading] = useState(false);
	const [repositories, setRepositories] = useState([]);
	const [filteredRepositories, setFilteredRepositories] = useState([]);
	const [filter, setFilter] = useState('');
	const [favorites, setFavorites] = useState([]);
	useEffect(() => {
		const userTemp = localStorage.getItem('HelloBuildApp');
		if (!userTemp) {
			navigate("/login")
		} else {
			setUser(JSON.parse(userTemp))
		}
		if (!localStorage.getItem('HelloBuildAppGAT')) {
			navigate("/");
		}
	}, [])

	useEffect(() => {
		if (data) {
			setRepositories(data.viewer.repositories.nodes)
		}
	}, [data]);

	useEffect(() => {
		updateFavorites();
	}, [user]);

	const updateFavorites = () => {
		getFavorites(user.id, (response) => {
			if (response.ok) {
				setFavorites(response.data);
			} else {
				alert(response.message);
			}
		});
	}

	useEffect(() => {
		if (filter) {
			setFilteredRepositories(repositories.filter(item => item.name.toLowerCase().trim().includes(filter.toLowerCase().trim())));
		}
	}, [filter]);

	const onLoadMore = () => {
		setLoading(true);
		fetchMore({
			variables: { after: data.viewer.repositories.pageInfo.endCursor },
			updateQuery: (prevResult, { fetchMoreResult }) => {
				const allData = prevResult.viewer.repositories.nodes.concat(fetchMoreResult.viewer.repositories.nodes);
				fetchMoreResult.viewer.repositories.nodes = allData;
				setLoading(false);
				return fetchMoreResult;
			},
		});
	};

	const addFavorite = (item, isFavorite) => {
		const body = {
			user_id: user.id,
			repository_id: item.id,
			is_favorite: isFavorite,
		};
		postFavorite(body, (response) => {
			if (response.ok) {
				setFavorites((prevState) => {
					let newState = [...prevState]
					if (isFavorite) {
						newState = prevState.filter((repo) => item.id !== repo.repository_id);
					} else {
						newState.push(body)
					}
					return newState;
				});
			} else {
				alert(response.message);
			}
		})
	}

	const isFavorite = (id) => {
		return !!favorites.find((item) => item.repository_id === id);
	}

	const logOut = () => {
		localStorage.removeItem('HelloBuildAppGAT');
		navigate('/')
	}

	if (loading) {
		return (
			<div>Cargando...</div>
		)
	}

	if (error) {
		return (
			<div>Github error, try again. {JSON.stringify(error)}</div>
		)
	}

	return (
		<div className="container mx-auto mt-10 mb-10 px-4">
			<div className="grid grid-cols-12 gap-8">
				<div className="col-start-1 col-end-4">
					<img src={data.viewer.avatarUrl} className="w-full rounded-full border border-gray-300" />
					<div className="font-bold mt-4">{data.viewer.login}</div>
					<button onClick={logOut} className="w-full mt-4 font-bold py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Log out</button>
				</div>
				<div className="col-start-4 col-end-13">
					<div className="font-bold mb-8 text-xl">Repository list</div>
					<input placeholder="Search..." type="text" value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-4" />
					<div className="grid grid-cols-2 gap-8">
						{
							(filter === '' ? repositories : filteredRepositories).map(repository => (
								<Repository
									key={repository.id}
									isFavorite={isFavorite(repository.id)}
									repository={repository}
									addFavorite={addFavorite}
								/>
							))
						}
					</div>
					{
						loadingMore && (
							<div className="text-center mt-2">
								<span className="cursor-not-allowed text-sm text-blue-600">Loading more...</span>
							</div>
						)
					}
					{
						data.viewer.repositories.pageInfo.hasNextPage && !loadingMore && (
							<div className="text-center mt-2">
								<span onClick={onLoadMore} className="cursor-pointer text-sm text-blue-600">Load more</span>
							</div>
						)
					}
				</div>
			</div>
		</div>
	)
}

export default Profile;