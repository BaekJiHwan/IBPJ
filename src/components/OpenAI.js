import axios from 'axios';

//스타트업 정보 gpt 평가
export const openaiChat = async (content) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                messages: [
                    { role: 'system', content: `모든 대답은 한글로 해줘` },
                    { role: 'user', content: content },
                ],
                max_tokens: 500,
                model: 'gpt-3.5-turbo'
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_OpenAI_API}`,
                }
            }
        )

        //대답
        console.log(response.data.choices[0].message.content)

        return response.data.choices[0].message.content

    } catch (error) {
        console.error('Error text: ', error.response.data.error.message)
    }
}






//스타트업에 대한 이미지 생성
export const openaiDALLE = async (content) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt: content,
                n: 1, // 생성할 이미지의 수
                size: "256x256" // 이미지의 크기
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_OpenAI_API}`
                }
            }
        );

        // API로부터 반환된 이미지 URL 추출
        const imageUrl = response.data.data[0].url;

        return imageUrl;
    } catch (error) {
        console.error('Error in DALL-E Image Generation:', error.response.data.error.message);
        return null;
    }
};