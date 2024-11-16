interface ProfileButtonProps {
  name?: string
}

export const ProfileButton = ({ name }: ProfileButtonProps) => {
  return (
    <div className="flex flex-row items-center justify-center gap-x-3">
      <p className="text-lg md:text-xl font-semibold">{name}</p>
    </div>
  )
}
