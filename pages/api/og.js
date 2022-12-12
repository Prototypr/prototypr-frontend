import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const  OgImageHandler = async (req)=> {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title')||'New job post'
    const companyLogo = searchParams.get('companyLogo')||''
    const companyName = searchParams.get('companyName')||''
    const salary = searchParams.get('salary')||''
    // const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    // const jsonData = await data.json()
  return new ImageResponse(
    (
        <div
        style={{
          display: 'flex',
          flexDirection:'column',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: '-.02em',
          fontWeight:700,
          background: 'white',
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
          width="150"
        //   height="80"
          src={`https://miro.medium.com/max/548/1*bfJZ_DxjhyCJstDw6nhEUw@2x.png`}
        />
          <span
            style={{
              marginLeft: 8,
              fontSize: 20,
            }}
          >
            💰 Job Post
          </span>
        </div>

        {companyLogo?
        <img style={{width:95, height:95, borderRadius:100,border:'1px solid #ddd'}} src={companyLogo}/>:''}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingTop: '16px',
            margin: '0 42px',
            fontSize: 32,
            width: 'auto',
            maxWidth: 550,
            textAlign: 'center',
          }}
        >
          {title}
        </div>
        {companyName?<div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingTop:'8px',
            margin: '0 42px',
            fontSize: 24,
            width: 'auto',
            maxWidth: 550,
            textAlign: 'center',
          }}>
            {companyName}
        </div>:''}
        {salary?<div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingTop:'32px',
            margin: '0 42px',
            fontSize: 24,
            width: 'auto',
            maxWidth: 550,
            textAlign: 'center',
          }}>
            🤑 {salary}
        </div>:''}
      </div>
      
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}

export default OgImageHandler;