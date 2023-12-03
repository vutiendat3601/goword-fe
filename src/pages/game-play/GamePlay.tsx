// ## Resources
import { useLoaderData } from 'react-router-dom';
import styles from './GamePlay.module.css';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { ExerciseModel } from '../../services/exercise-service';
import { deVietnamese } from '../../utils/keyboard-util';

const css = classNames.bind(styles);
function GamePlay() {
  const [lineHTMLs, setLineHTMLs] = useState<JSX.Element[]>([]);

  // ## Ref

  const linesRef = useRef<string[]>();
  const lineRef = useRef<{
    chars: string[];
    charIdx: number;
    typedChars: string;
    decodedChars: string;
    lineNum: number;
  }>();
  const contentRef = useRef<HTMLParagraphElement>(null);

  const exercise: ExerciseModel = useLoaderData() as ExerciseModel;

  useEffect(() => {
    if (exercise) {
      let lines = exercise.content.split('\n');
      const lineHTMLs: JSX.Element[] = lines.map((line, index) => {
        const tokens: string[] = line.trim().split(' ');
        return (
          <span className={css('line')} key={index}>
            {tokens.map((token, index) => (
              <span className={css('token')} key={index}>
                {token}{' '}
              </span>
            ))}
          </span>
        );
      });
      lineRef.current = {
        charIdx: 0,
        chars: lines[0].trim().replace('\n', '').split(''),
        lineNum: 0,
        decodedChars: deVietnamese(lines[0].charAt(0)),
        typedChars: '',
      };
      linesRef.current = lines;
      setLineHTMLs(lineHTMLs);
    }
  }, [exercise]);

  useEffect(() => {
    const line = lineRef.current;
    if (line) {
      const { charIdx, chars, lineNum } = line;
      chars[
        charIdx
      ] = `<span class="char current" key={${charIdx}}>${chars[charIdx]}</span>`;
      setLineHTMLs((lineHTMLs) => {
        const newLineHTMLs = [...lineHTMLs];
        newLineHTMLs[lineNum] = (
          <span
            className={css('line')}
            dangerouslySetInnerHTML={{ __html: chars.join('') }}
            key={lineNum}
          ></span>
        );
        return newLineHTMLs;
      });
    }
  }, [lineRef.current?.charIdx]);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      const keyCode = e.keyCode;
      // ## Back, Shift, Ctrl, Alt, Space
      // const specialKeyCodes = [8, 9, 16, 17, 18, 32];

      const line = lineRef.current;
      const lines = linesRef.current;
      if (keyCode === 8 && line) {
        line.typedChars = '';
      }
      if (32 <= keyCode && keyCode <= 126) {
        e.preventDefault();
        setLineHTMLs((lineHTMLs) => {
          const newLineHTMLs = [...lineHTMLs];
          if (line && lines) {
            const { charIdx, chars, lineNum, decodedChars } = line;
            line.typedChars += e.key;
            if (line.typedChars.length === decodedChars.length) {
              chars[charIdx] = `<span class="char ${
                line.typedChars === decodedChars ? 'correct' : 'wrong'
              }">${lines[lineNum][charIdx]}</span>`;
              newLineHTMLs[lineNum] = (
                <span
                  className={css('line')}
                  dangerouslySetInnerHTML={{ __html: chars.join('') }}
                ></span>
              );

              if (charIdx === chars.length - 1) {
                if (lineNum < lines.length - 1) {
                  line.charIdx = 0;
                  line.lineNum = lineNum + 1;
                  line.chars = lines[lineNum + 1].split('');
                  line.decodedChars = deVietnamese(
                    lines[lineNum + 1].charAt(0)
                  );
                  if (contentRef.current) {
                    contentRef.current.scrollTop += 32;
                  }
                } else {
                  // End game
                }
              } else {
                line.charIdx = charIdx + 1;
                line.decodedChars = deVietnamese(
                  lines[lineNum].charAt(charIdx + 1)
                );
              }
              line.typedChars = '';
            }
          }
          return newLineHTMLs;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={css('game-wrapper')}>
      {exercise ? (
        <>
          {/* <h1 className="name">{exercise.name}</h1> */}
          <img src={exercise.thumb} alt="" className={css('thumb')} />
          <div>
            <p
              className={css('content')}
              ref={contentRef}
              // dangerouslySetInnerHTML={{
              // __html: exercise.content.replace(/\n/g, '<br>'),
              // }}
            >
              {lineHTMLs}
            </p>
          </div>
        </>
      ) : (
        <h2>Exercise not found.</h2>
      )}
    </div>
  );
}

export default GamePlay;
