import s from './index.module.css';
import ParaChan from '@/assets/parachan.png';
import Big from '@/assets/big.png';
import ASDF from '@/assets/asdf.svg?react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
    const navigate = useNavigate();
return (
    <div className={s.layout}>
        <div className={s.container}>
            <img width={550} src={Big} />
            <button onClick={() => navigate('/letter')} className={s.button}>
                <ASDF />
            </button>
                </div>
        <img width={600} className={s.image} src={ParaChan} alt="parachan" />
        </div>
)
}
