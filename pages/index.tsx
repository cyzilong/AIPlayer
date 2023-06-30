'use client'

import { useCallback, useEffect, useState } from 'react';
import { getConfig, Config } from '../config'
import { Badge, Card, Container, Grid, Text } from '@nextui-org/react'

export default function Home() {

  // 获取当前时间，持续更新
  const [now, setNow] = useState<Date | null>(null);

  const [config, setConfig] = useState<Config[] | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
      setConfig(getConfig());
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, []);

  // 根据now获取19:30:00格式的时间，如果是各位数，则补0
  const getNowStr = useCallback(() => {
    if (now === null) return '';
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
  }, [now]);

  return (
    <Container>
      <Text css={{ textAlign: 'center' }} h1>{getNowStr()}</Text>
      {config && config.map((item) => {
        return (
          <div key={item.name}>
            <Container display='flex' justify='center' alignItems='center'>
              <Text h3 color="error">[{item.line}] {item.name} {'=>'} {item.my_direction}</Text>
            </Container>
            <Grid.Container gap={2} justify="center">
              {item.nextTimes.map((time) => {
                return (
                  <Grid xs={12} key={time.time} css={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text span color={time.isHalf ? 'error' : ''}>发车时间: {time.time}</Text>
                    <Text span color={time.isHalf ? 'error' : ''}>终点站: {time.terminus}</Text>
                  </Grid>
                );
              })}
            </Grid.Container>
          </div>
        );
      })}
    </Container>
  )
}