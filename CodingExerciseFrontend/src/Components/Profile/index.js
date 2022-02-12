import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_USER_DATA } from "../../GraphQL/queries";
import { useQuery } from "@apollo/client";

function Profile() {
	const { loading, error, data, fetchMore } = useQuery(GET_USER_DATA);
	const navigate = useNavigate();
	const [repositories, setRepositories] = useState([]);
	const [filteredRepositories, setFilteredRepositories] = useState([]);
	const [filter, setFilter] = useState('');
	useEffect(() => {
		const userTemp = localStorage.getItem('HelloBuildApp');
		if (!userTemp) {
			navigate("/login")
		}
		if (!localStorage.getItem('HelloBuildAppGAT')) {
			navigate("/");
		}
	}, [])

	useEffect(() => {
		if (data) {
			setRepositories(data.viewer.repositories.nodes)
		}
	}, [data])

	useEffect(() => {
		if (filter) {
			setFilteredRepositories(repositories.filter(item => item.name.toLowerCase().trim().includes(filter.toLowerCase().trim())));
		}
	}, [filter])


	if (loading) {
		return (
			<div>Cargando...</div>
		)
	}
	if (error) {
		return (
			<div>Github error, try again.</div>
		)
	}
	return (
		<div>
			<div>{data.viewer.login}</div>
			<div>
				<input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
				{
					(filter === '' ? repositories : filteredRepositories).map(repository => (
						<div key={repository.id}>{repository.name}</div>
					))
				}</div>
		</div>
	)
}

export default Profile;