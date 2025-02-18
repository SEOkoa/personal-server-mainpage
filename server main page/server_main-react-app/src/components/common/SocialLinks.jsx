import React from 'react';
import instagramIcon from '../../assets/instagram-icon.svg';
import blogIcon from '../../assets/blog-icon.svg';
import githubIcon from '../../assets/github-icon.png';

const SocialLinks = () => (
  <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
    <tbody>
      <tr>
        <td>
          <SocialIcon href="https://www.instagram.com/seo.koa/" icon={instagramIcon} label="@seo.koa" />
        </td>
        <td>
          <SocialIcon href="https://www.instagram.com/xross.koa/" icon={instagramIcon} label="@xross.koa" />
        </td>
        <td>
          <SocialIcon href="https://blog.xross.kr" icon={blogIcon} label="Blog" />
        </td>
        <td>
          <SocialIcon href="https://github.com/seokoa" icon={githubIcon} label="GitHub" />
        </td>
      </tr>
    </tbody>
  </table>
);

const SocialIcon = ({ href, icon, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
    <a href={href}>
      <img src={icon} alt={label} style={{ height: '30px' }} />
    </a>
    <p style={{ margin: '0' }}>{label}</p>
  </div>
);

export default SocialLinks;
