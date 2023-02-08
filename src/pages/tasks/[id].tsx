import { useRouter } from 'next/router'

type Props = {}

export default function TaskId({}: Props) {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      Task {id}
    </div>
  )
}
