import { useRouter } from 'next/router'

type Props = {}

export default function UserId({}: Props) {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      User {id}
    </div>
  )
}
