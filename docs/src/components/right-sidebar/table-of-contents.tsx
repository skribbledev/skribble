import { type FC, useEffect, useRef, useState } from 'react';

const TableOfContents: FC<{ headers: any[] }> = (props) => {
  const headers = props?.headers;
  const itemOffsets = useRef<Array<{ id: string; topOffset: number }>>([]);
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const getItemOffsets = () => {
      const titles = document.querySelectorAll('article :is(h1, h2, h3, h4)');
      itemOffsets.current = [];

      titles.forEach((title) => {
        itemOffsets.current.push({
          id: title.id,
          topOffset: title.getBoundingClientRect().top + window.scrollY,
        });
      });
    };
    getItemOffsets();

    window.addEventListener('resize', getItemOffsets);

    return () => {
      window.removeEventListener('resize', getItemOffsets);
    };
  }, []);

  return (
    <>
      <h2 className='heading'>On this page</h2>
      <ul>
        <li className={`header-link depth-2 ${activeId === 'overview' ? 'active' : ''}`.trim()}>
          <a href='#overview' onClick={() => setActiveId('overview')}>
            Overview
          </a>
        </li>
        {headers
          .filter(({ depth }) => depth > 1 && depth < 4)
          .map((header) => (
            <li
              key={header}
              className={`header-link depth-${header.depth} ${
                activeId === header.slug ? 'active' : ''
              }`.trim()}
            >
              <a
                href={`#${header.slug}`}
                onClick={() => {
                  setActiveId(header.slug);
                }}
              >
                {header.text}
              </a>
            </li>
          ))}
      </ul>
    </>
  );
};

export default TableOfContents;
