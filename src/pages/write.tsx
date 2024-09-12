import React from 'react'
import s from './write.module.css'
import Topgraphic from '@/assets/write.svg?react'
import WriteText from '@/assets/writetext.svg?react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export default function Write() {
    const [name, setName] = React.useState('')
    const [content, setContent] = React.useState('')

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const submit = async () => {
        if(name === '' || content === '') {
          alert('이름과 내용을 입력해주세요.')
          return
        }
        fetch('https://tategb.apne2a.algorix.cloud/para/guestbook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            message: content,
          }),
        }).then((res) => {
          if (res.ok) {
            alert('등록되었습니다.')
            setName('')
            setContent('')
            navigate('/')
          } else {
            alert('등록에 실패했습니다.')
          }
        })
      }

    const mutation = useMutation({
        mutationFn: submit,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['letters'] })
        },
      })
  return (
    <div className={s.layout}>
    <div className={s.container}>
        <Topgraphic />
        <div className={s.form}>
            <div className={s.top}>
                <input className={s.name} value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력해주세요" />
                <div className={s.box}>
                    <textarea maxLength={300} value={content} onChange={(e) => setContent(e.target.value)} className={s.content} placeholder="편지를 작성해주세요" />
                    <div className={s.count} >{content.length}/300자</div>
                </div>
            </div>
            <button onClick={() => mutation.mutate()} className={s.submit}>
                <WriteText />
            </button>
        </div>
    </div>
    </div>
  )
}
