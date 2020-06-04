import React, { useState, useRef, useEffect } from 'react';


const rspCoords = {
    '바위': '0',
    '가위': '-142px',
    '보': '-284px'
};

const scores = {
    '바위': '0',
    '가위': '1',
    '보': '-1'
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find((v) => {
        return v[1] === imgCoord;
    })[0];
}



const RPS = () => {
    const[result, setResult] = useState('');
    const[imgCoord, setImgCoord] = useState(rspCoords.바위);
    const[score, SetScore] = useState(0);
    const interval = useRef();

    useEffect(() => { //componentDidMount, componentDidUpdate 역할
        interval.current = setInterval(changeHand, 200);
        return () => { //componentWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [ imgCoord ]); //클로저 문제를 해결해주는 배열
    // 두 번재 인수 배열에 넣은 값들이 바뀔 때 useEffect가 실행된다.  

    const changeHand = () => {
        if (imgCoord === rspCoords.바위){
            setImgCoord(rspCoords.가위);
        } else if(imgCoord === rspCoords.가위){
            setImgCoord(rspCoords.보);
        } else if(imgCoord === rspCoords.보){
            setImgCoord(rspCoords.바위);
        }
    }


    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0) { 
            setResult( '비겼습니다.')
        } else if([-1, 2].includes(diff)){
            setResult('You win!');
            SetScore((prevState)=>{
                prevState + 1;
            });
        } else {
            setResult('You lose..');
            SetScore((prevState)=>{
                prevState - 1;
            });
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 500);
        }, 1000)
    };


    return (
        <div id="RPS">
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0 `}}></div>
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 : {score}점</div>
        </div>
    );
}


export default RPS;