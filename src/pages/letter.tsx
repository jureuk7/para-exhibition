import LetterCard from '@/components/LetterCard'
import s from './letter.module.css'
import LeftGraphic from '@/assets/leftgraphic.png'
import Title from '@/assets/title.svg?react'
import Right from '@/assets/right.svg?react'
import { useQuery } from '@tanstack/react-query'
import Text from '@/assets/text.svg?react'
import { useNavigate } from 'react-router-dom'

interface LetterType {
    name: string;
    message: string;
    id: string;
}

export default function Letter() {
    const navigate = useNavigate();

    const { data } = useQuery<LetterType[]>({
        queryKey: ['letters'],
        queryFn: async (): Promise<LetterType[]> => {
            const res = await fetch('https://tategb.apne2a.algorix.cloud/para/guestbook');
            if (!res.ok) {
            throw new Error('Network response was not ok');
            }
            const result = await res.json();
            return result as LetterType[];  
        }
        });

  return (
    <div className={s.layout}>
        <div className={s.left}>
        <img width={396} height={480} src={LeftGraphic} alt="left graphic" />
            <button className={s.go} onClick={() => navigate('/write')}>
                <Text />
            </button>
        </div>

        <div className={s.wrapper}>
            <div className={s.top}>
                <Title />
                <Right />
                </div>
        <div className={s.container}>
            {data?.map((item:LetterType, index) => (
                <LetterCard key={index} name={item.name} content={item.message} index={index} />
            ))}
        </div>
        </div>
    </div>
  )
}
