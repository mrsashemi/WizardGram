import http from 'k6/http';

export const options = {
    vus: 1,
    duration: '30m',
};
  

export default function () {
    let img = [3, 6, 7, 8, 9, 10, 13, 14, 16, 17, 18];
    let classes = [1, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];

    const payload = JSON.stringify({
        post_type: 'photograph',
        title: 'load test',
        body: 'load test',
        img_id: img[Math.floor(Math.random() * img.length)],
        class_id: classes[Math.floor(Math.random() * classes.length)]
    });

    const headers = { 'Content-Type': 'application/json' };
    //http.post('http://localhost:5050/posts/create-post', payload, { headers });
    //http.get('http://localhost:5050/posts/get-all-fishstaposts', { headers });
    http.del('http://localhost:5050/posts/delete-all-posts', { headers });
}