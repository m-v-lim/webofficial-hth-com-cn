// public/site-helper.js
(function() {
  'use strict';

  // 配置数据
  const SITE_CONFIG = {
    title: '华体会 - 官方体育平台',
    officialUrl: 'https://weibofficial-hth.com.cn',
    keywords: ['华体会', '体育赛事', '电竞竞猜', '真人娱乐', '官方入口'],
    tips: [
      '请认准官方唯一网址，谨防仿冒站点。',
      '推荐使用 Chrome 或 Edge 浏览器获得最佳体验。',
      '每日签到可领取免费彩金，不要错过。'
    ]
  };

  // 页面元素工具
  function createElement(tag, attributes, children) {
    const el = document.createElement(tag);
    if (attributes) {
      Object.keys(attributes).forEach(key => {
        if (key === 'className') {
          el.className = attributes[key];
        } else if (key === 'textContent') {
          el.textContent = attributes[key];
        } else if (key === 'innerHTML') {
          el.innerHTML = attributes[key];
        } else {
          el.setAttribute(key, attributes[key]);
        }
      });
    }
    if (children) {
      children.forEach(child => {
        if (typeof child === 'string') {
          el.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
          el.appendChild(child);
        }
      });
    }
    return el;
  }

  // 生成关键词徽章
  function renderBadges(container, keywords) {
    const badgeContainer = createElement('div', { className: 'helper-badges' });
    keywords.forEach(keyword => {
      const badge = createElement('span', {
        className: 'helper-badge',
        textContent: keyword
      });
      badgeContainer.appendChild(badge);
    });
    container.appendChild(badgeContainer);
  }

  // 生成提示卡片
  function renderTips(container, tips) {
    const tipList = createElement('ul', { className: 'helper-tips' });
    tips.forEach(tip => {
      const item = createElement('li', { textContent: tip });
      tipList.appendChild(item);
    });
    container.appendChild(tipList);
  }

  // 生成访问说明
  function renderAccessInfo(container, url) {
    const infoBox = createElement('div', { className: 'helper-access' });
    const link = createElement('a', {
      href: url,
      target: '_blank',
      rel: 'noopener noreferrer',
      textContent: '点击进入官方站点 →'
    });
    const note = createElement('p', {
      textContent: '如页面显示异常，请清除缓存或切换网络环境。'
    });
    infoBox.appendChild(link);
    infoBox.appendChild(note);
    container.appendChild(infoBox);
  }

  // 主渲染函数
  function initHelper() {
    // 创建主容器
    const container = createElement('div', { className: 'site-helper-widget' });
    const header = createElement('h3', {
      textContent: SITE_CONFIG.title
    });
    container.appendChild(header);

    // 关键词徽章
    renderBadges(container, SITE_CONFIG.keywords);

    // 提示卡片
    renderTips(container, SITE_CONFIG.tips);

    // 访问说明
    renderAccessInfo(container, SITE_CONFIG.officialUrl);

    // 插入到页面底部
    const body = document.body;
    if (body) {
      body.appendChild(container);
    }

    // 注入样式
    injectStyles();
  }

  // 注入基础样式（不依赖外部库）
  function injectStyles() {
    const style = createElement('style', {
      type: 'text/css',
      textContent: `
        .site-helper-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 280px;
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          z-index: 9999;
          transition: transform 0.3s ease;
        }
        .site-helper-widget:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }
        .site-helper-widget h3 {
          margin: 0 0 12px 0;
          font-size: 16px;
          color: #1a1a2e;
          border-bottom: 2px solid #e94560;
          padding-bottom: 8px;
        }
        .helper-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }
        .helper-badge {
          background: #e94560;
          color: #fff;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 20px;
          display: inline-block;
          white-space: nowrap;
        }
        .helper-tips {
          list-style: none;
          padding: 0;
          margin: 0 0 12px 0;
        }
        .helper-tips li {
          font-size: 13px;
          color: #333;
          padding: 4px 0;
          border-bottom: 1px dashed #eee;
        }
        .helper-tips li:last-child {
          border-bottom: none;
        }
        .helper-access {
          border-top: 1px solid #eee;
          padding-top: 10px;
        }
        .helper-access a {
          display: inline-block;
          background: #0f3460;
          color: #fff;
          padding: 8px 16px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: background 0.2s;
        }
        .helper-access a:hover {
          background: #16213e;
        }
        .helper-access p {
          margin: 8px 0 0 0;
          font-size: 12px;
          color: #888;
        }
      `
    });
    document.head.appendChild(style);
  }

  // DOM 加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHelper);
  } else {
    initHelper();
  }
})();