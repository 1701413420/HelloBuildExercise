import React from 'react'

function Repository({ repository, isFavorite, addFavorite }) {

	const openRepository = (url) => {
		window.open(url, "__blank");
	};

	return (
		<div className="border border-gray-300 p-2 rounded">
			<div className="flex items-center justify-between">
				<div className="text-gray-900 font-bold cursor-pointer hover:underline" onClick={() => openRepository(repository.url)}>{repository.name}</div>
				<div className="mt-1 border border-gray-600 rounded-full font-bold text-xs px-3">{repository.createdAt.slice(0, 10)}</div>
			</div>
			<div className="flex items-center justify-between mt-4">
				<div className="text-gray-600 text-sm"><img src={repository.owner.avatarUrl} className="inline object-cover w-5 h-5 rounded-full mr-1" />{repository.owner.login}</div>
				<div>
					<svg onClick={()=> addFavorite(repository, isFavorite)} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer h-6 w-6" fill={isFavorite ? '#000000' : 'none'} viewBox="0 0 24 24" stroke={!isFavorite ? '#000000' : 'none'}>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
					</svg>
				</div>
			</div>
		</div>
	)
};

export default Repository;