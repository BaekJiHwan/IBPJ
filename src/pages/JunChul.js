import React, { Component, useState, useEffect } from "react";
import '../CSS/Profile.css'
import axios from 'axios';
import { fetchLang } from "../components/GitHubREST";
import ApexCharts from 'react-apexcharts';

const JunChul = () => {
    const [gitResult, setGitResult] = useState(null)
    const [data, setData] = useState({
        labels: [],
        datasets: [{ data: [] }],
    });

    const [inputs, setInputs] = useState({
        comment: "",
    });

    const { comment } = inputs;
    const [comments, setComments] = useState([]); // 사용자의 댓글들을 저장할 상태

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.id]: e.target.value });
    };

    const onSubmit = async () => {
        setComments(prevComments => [...prevComments, { content: comment }]);
        setInputs({ comment: "" }); // 입력 필드 초기화
        try {
            await axios.post(`${process.env.REACT_APP_Endpoint}/pushComment`, { comment: comment, postID: 2 });
        } catch (error) {
            console.error(error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_Endpoint}/pullComment?postID=2`);
            setComments(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // 컴포넌트 마운트 시 댓글 불러오기
    useEffect(() => {
        const fetchGit = async () => {
            const response = await fetchLang('CookiePawn')
            setGitResult(response.repoName)
            if (response) {
                // 객체의 키와 값을 분리하여 두 개의 배열로 만듦
                const labels = Object.keys(response.repoLang);
                const data = Object.values(response.repoLang);

                // 데이터를 내림차순으로 정렬하고, 레이블도 동일한 순서로 정렬
                const sortedIndices = data
                    .map((value, index) => ({ value, index }))
                    .sort((a, b) => b.value - a.value)
                    .map(data => data.index);

                const sortedLabels = sortedIndices.map(index => labels[index]);
                const sortedData = sortedIndices.map(index => data[index]);

                // 차트 데이터 상태 업데이트
                setData({
                    labels: sortedLabels,
                    datasets: [
                        {
                            data: sortedData
                        }
                    ]
                });
            }
        }
        fetchGit();
        fetchComments();
    }, []);



    var options = {
        series: [{
            data: data.datasets[0].data
        }],
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false, // 툴바 숨기기
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        colors: ['black'], // 여기에 원하는 색상 코드를 배열 형태로 추가하세요.
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: data.labels,
            labels: {
                show: false,
            },
        }
    };




    return (
        <div>
            <div className="information">
                <div className="profile-image">
                    <img className="image" src="image/JunChul.png" />
                </div>
                <div className="Sign">AJC</div>
                <div className="mbti">제 MBTI는</div>
                <div className="mbtiInfo">
                    INFP 였는데요. 누구때문에
                    <br />
                    S 100%, T 100%로 바뀌었어요 ^^
                </div>
                <div className="inforView">
                    <div className="leftInfo">
                        <div className="nameText">안준철</div>
                        <div className="EngName">Ahn Jun Chul</div>
                        <div className="birthday">2000.11.13</div>
                        <div className="phoneNum">010-8915-2856</div>
                        <div className="mailAddress">cookiepawn@naver.com</div>

                        <div className="Education">Education</div>
                        <div className="date">2019.02</div>
                        <div className="contents">아산고등학교 졸업</div>
                        <div className="date1">2019.03</div>
                        <div className="contents1">선문대학교 컴퓨터공학부 입학</div>
                        <div className="date2">2025.02</div>
                        <div className="contents2">선문대학교 컴퓨터공학부 졸업 예정</div>

                        <div className="TMI">TMI</div>
                        <div className="TMI-Contents">최애 유튜버</div>
                        <div className="TMI-Name">훼사원</div>
                    </div>


                    <div className="rightInfo">
                        <div className="Activites">ACTIVITES</div>
                        <div className="date3">2019</div>
                        <div className="contents3">컴퓨터공학부 학생회</div>

                        <div className="Project">PROJECT</div>
                        {gitResult && gitResult.map((item, idx) => {
                            return (
                                <>
                                    <div className="date4">{item}</div>
                                    <div className="contents4">
                                        <a href={`https://github.com/cookiepawn/${item}`} target="_blank" rel="noopener noreferrer">
                                            https://github.com/cookiepawn/{item}
                                        </a>
                                    </div>
                                </>
                            )
                        })}

                        <div className="Skills">SKILLS</div>
                        <div id="chart">
                            <ApexCharts options={options} series={options.series} type="bar" height={300} width={500} />
                        </div>

                    </div>
                </div>

            </div>
            <div className="commentsContainer">
                <div className="commentSection">
                    <label className="commentName">댓글</label>
                    <input type="text" id="comment" value={comment} onChange={onChange} />
                    <button type="button" onClick={onSubmit}>작성</button>
                </div>
                <div className="commentsDisplay">
                    {comments.map((c, index) => (
                        <div key={index}> 익명 : {c}</div>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default JunChul;