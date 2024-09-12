import React from 'react'
import s from './LetterCard.module.css';

interface Props {
    name: string;
    content: string;
    index: number;
}

export default function LetterCard({
    name,
    content,
    }: Props) {
    return (
        <div className={s.container}>
            <div className={s.content}>{content}</div>
            <div className={s.name}>From, {name}</div>
        </div>
    )
}