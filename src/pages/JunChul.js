import React, { Component, useState } from "react";
import '../CSS/Profile.css'

const JunChul = () => {

    const [inputs, setInputs] = useState({
        comment: "",
    });

    const { comment } = inputs;
    const [comments, setComments] = useState([]); // 사용자의 댓글들을 저장할 상태

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.id]: e.target.value });
    };

    const onSubmit = () => {
        
        setComments([...comments, comment]); // 새 댓글 추가
        setInputs({ comment: "" }); // 입력 필드 초기화
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
                        <div className="date4">2학년 1학기</div>
                        <div className="contents4">기초 프로젝트 1 환자 관리 프로그램 제작</div>
                        <div className="date5">2학년 2학기</div>
                        <div className="contents5">기초 프로젝트 2 키오스크 제작</div>
                        <div className="date6">3학년 1학기</div>
                        <div className="contents6">오픈SW 프로젝트 CNFT-WITH 제작</div>
                        

                        <div className="Skills">SKILLS</div>
                        <div className="sk-1">HTML</div>
                        <div className="sk-2">JavaScript</div>
                        <div className="sk-3">Python</div>
                        <div className="sk-4">CSS</div>

                        <div className="overlap-group">
                            <div className="rectangle" />
                        </div>
                        <div className="overlap-group2">
                            <div className="rectangle-2" />
                        </div>
                        <div className="overlap-group3">
                            <div className="rectangle-3" />
                        </div>
                        <div className="overlap-group4">
                            <div className="rectangle-4" />
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