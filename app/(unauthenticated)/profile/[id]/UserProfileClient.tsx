'use client'

import { useEffect, useState } from 'react'
import { User, Song } from '../../../../types/user'
import {
	fetchSongs,
	addSong,
	updateSong,
	deleteSong,
} from '../../../../lib/utils/song'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import ProfileDetails from '@/components/ProfileDetails'
import FavoriteSongs from '@/components/FavoriteSongs'
import AddSongForm from '@/components/AddSongForm'

export default function UserProfileClient({ user }: { user: User }) {
	const [songs, setSongs] = useState<Song[]>([])
	const [editingSong, setEditingSong] = useState<Song | null>(null)
	const [showAddSongForm, setShowAddSongForm] = useState(false)

	useEffect(() => {
		fetchSongs(user.id)
			.then(setSongs)
			.catch(() => toast.error('Failed to fetch songs.'))
	}, [user.id])

	const handleAddSong = async (newSong: Omit<Song, 'id'>) => {
		try {
			const song = { ...newSong, id: parseInt(uuidv4(), 16) }
			const addedSong = await addSong(user.id, song)
			setSongs([...songs, addedSong])
			setShowAddSongForm(false)
			toast.success('Song added successfully!')
		} catch {
			toast.error('Failed to add song.')
		}
	}

	const handleUpdateSong = async (updatedSong: Song) => {
		try {
			const song = await updateSong(user.id, updatedSong)
			setSongs(songs.map((s) => (s.id === song.id ? song : s)))
			setEditingSong(null)
			toast.success('Song updated successfully!')
		} catch {
			toast.error('Failed to update song.')
		}
	}

	// Remove a song
	const handleRemoveSong = async (songId: number) => {
		try {
			await deleteSong(user.id, songId)
			setSongs(songs.filter((s) => s.id !== songId))
			toast.success('Song removed successfully!')
		} catch {
			toast.error('Failed to delete song.')
		}
	}

	return (
		<div className='p-6 max-w-4xl mx-auto'>
			<div className='p-6 max-w-4xl mx-auto'>
				{/* Profile Details */}
				<ProfileDetails user={user} />

				{/* Add Song Section */}
				{!showAddSongForm && (
					<button
						onClick={() => setShowAddSongForm(true)}
						className='mt-4 px-4 py-2 bg-green-500 text-white rounded'>
						Add Song
					</button>
				)}
				{showAddSongForm && (
					<AddSongForm
						onSave={handleAddSong}
						onCancel={() => setShowAddSongForm(false)}
					/>
				)}

				{/* Favorite Songs Section */}
				<FavoriteSongs
					songs={songs}
					editingSong={editingSong}
					onEdit={setEditingSong}
					onSave={handleUpdateSong}
					onRemove={handleRemoveSong}
				/>
			</div>{' '}
		</div>
	)
}