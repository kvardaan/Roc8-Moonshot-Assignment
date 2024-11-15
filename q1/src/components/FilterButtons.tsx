interface FilterButtonsProps {
	filter: "all" | "unread" | "read" | "favorites";
	setFilter: (filter: "all" | "unread" | "read" | "favorites") => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter }) => {
	return (
		<nav className="flex gap-x-3 pt-2 text-black">
			<p className="py-2">Filter By:</p>
			<button
				className={`px-4 rounded-full ${filter === "all" ? "bg-[#E1E4EA] border-2 border-[#d6d9de] text-[#636363]" : ""}`}
				onClick={() => setFilter("all")}
			>
				All
			</button>
			<button
				className={`px-4 rounded-full ${filter === "unread" ? "bg-[#E1E4EA] border-2 border-[#d6d9de] text-[#636363]" : ""}`}
				onClick={() => setFilter("unread")}
			>
				Unread
			</button>
			<button
				className={`px-4 rounded-full ${filter === "read" ? "bg-[#E1E4EA] border-2 border-[#d6d9de] text-[#636363]" : ""}`}
				onClick={() => setFilter("read")}
			>
				Read
			</button>
			<button
				className={`px-4 rounded-full ${
					filter === "favorites" ? "bg-[#E1E4EA] border-2 border-[#d6d9de] text-[#636363]" : ""
				}`}
				onClick={() => setFilter("favorites")}
			>
				Favorites
			</button>
		</nav>
	);
};

export default FilterButtons;
