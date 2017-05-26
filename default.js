function onNextFrame(callback) {
  return () => {
    setTimeout(function () {
      window.requestAnimationFrame(callback)
    }, 0)
  };
}

function addScript(src, callback) {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('charset', 'utf-8');
  script.setAttribute('src', src);
  script.onload = callback;
  head.appendChild(script);
}

function addStyle(src) {
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = src;
  head.appendChild(link);
}

// mermaid
function embedMermaid() {
  const mermaidDivs = document.querySelectorAll('.mermaid');
  const mermaidArr = Array.prototype.slice.call(mermaidDivs);
  if (!mermaidArr.length) return;
  function mermaidHandler() {
    window.mermaid.initialize({
      startOnLoad: false,
      logLevel: 4,
      gantt: {
        axisFormatter: [
          // Within a day
          ["%I:%M", function (d) {
            return d.getHours();
          }],
          // Monday a week
          ["%m-%d", function (d) {
            return d.getDay() == 1;
          }],
          // Day within a week (not monday)
          ["%m-%e", function (d) {
            return d.getDay() && d.getDate() != 1;
          }],
          // within a month
          ["%m-%e", function (d) {
            return d.getDate() != 1;
          }],
          // Month
          ["%m-%e", function (d) {
            return d.getMonth();
          }]
        ]
      },
    });
    mermaidArr.forEach((f, i) => {
      if (f.dataset["processed"] === 'true') return;
      f.innerHTML = decodeURIComponent(f.dataset["source"]);
      f.style.color = 'white';
      (onNextFrame(() => {
        window.mermaid.init(undefined, f);
        if (!('eventAttached' in f.dataset)) {
          f.dataset['eventAttached'] = true;
        }
        f.style.color = 'inherit';
      }))();
    });
  }

  if (window.mermaid) {
    mermaidHandler();
  } else {
    addStyle('https://cdn.rawgit.com/knsv/mermaid/7.0.0/dist/mermaid.css');
    addScript(
      'https://cdn.rawgit.com/knsv/mermaid/7.0.0/dist/mermaid.min.js',
      mermaidHandler
    );
  }
}

window.addEventListener('load', embedMermaid, false);
