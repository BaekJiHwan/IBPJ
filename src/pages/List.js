import React from "react";

const User = ({userData}) => {
    return(
        <tr>
            <td>{userData.name}</td>
            <td>{userData.email}</td>
        </tr>
    )
}

const UserList = () => {
    const users = [
        {email: 'baek@gmail.com', name: '지환'},
        {email: 'kim@gmail.com', name: '우희'},
        {email: 'ahn@gmail.com', name: '준철'},
        {email: 'lee@gmail.com', name: '상용'},
    ];

    return (
        <table>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>이메일</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <User userData={user} />)}
            </tbody>
        </table>
    )
}

export default UserList;