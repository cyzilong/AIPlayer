'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Text, Container, Input, Button } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';

function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const join = useCallback(async (e: any) => {
    if (loading) return;

    if (!inputRef.current?.value) {
      toast.error('Please enter your email address');
      return;
    }

    const email = inputRef.current.value;
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    const notice = toast.loading('Joining the waitlist...');

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }
      toast.success('You are now on the waitlist!');
    } catch (e: any) {
      if (e.message === 'Member Exists') {
        toast.success('You are already on the waitlist!')
      } else {
        toast.error(e.message);
      }
    }

    getCount();
    toast.dismiss(notice);
    setLoading(false)

  }, [loading]);

  const [count, setCount] = useState(0);
  async function getCount() {
    const res = await fetch(`/api/count?q=${Date.now()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
    const json = await res.json();
    setCount(json.count);
    return json;
  }

  useEffect(() => {
    getCount();
  }, []);

  return (
    <Container fluid
      css={{ padding: "2em 1em", textAlign: "center" }}
      display='flex' justify='center' direction='column'>
      <div>
        <Image alt='aiplayer' objectFit="fill" width={100} height={100} src={"/aiplayer.svg"}></Image>
      </div>
      <Text h3 weight="bold" css={{
        textGradient: "45deg, $purple500 45%, $cyan600 55%",
        letterSpacing: "0em",
      }}>
        aiplayer.me
      </Text>
      <Text h2 weight="bold" css={{
        textGradient: "45deg, $blue600 0%, $pink600 60%",
        padding: ".5em 0",
      }}>
        Play with AI and create unlimited possibilities
      </Text>
      <Text css={{ padding: ".5em 0 0 0" }} color='$accents8'>AI Player is an all-new AI platform. </Text>
      <Text css={{ padding: ".2em 0 0 0" }} color='$accents8'>We are committed to opening the door to the AI world for AI enthusiasts.</Text>
      <Text css={{ padding: ".2em 0 0 0" }} color='$accents8'> We sincerely invite you to explore AI with us and experience brand new AI gameplay.</Text>
      {/* <Text h2 css={{ padding: ".5em 0", fontWeight: 800, letterSpacing: "0em" }}>Coming Soon ...</Text> */}
      <Text css={{ padding: "1em 0 0 0", letterSpacing: "0em", }} h3>Just join the waitlist of aiplayer.me</Text>
      <Text
        css={{ padding: ".5em 0", letterSpacing: "0em", }}
        small color='$accents6'>only
        <Text weight="bold" css={{
          display: "inline",
          padding: "0 .3em",
        }}>{count}</Text> people are waiting</Text>
      <Container css={{ padding: ".5em 0" }} display='flex' justify='center'>
        <Input ref={inputRef} type="email" style={{ width: '260px', textAlign: "center" }} placeholder='Enter your email address'></Input>
      </Container>
      <Container css={{ padding: ".5em 0" }} display='flex' justify='center'>
        <Button disabled={loading} onClick={join}>Join the waitlist</Button>
      </Container>
      <Text color='$accents6'>we will notify you when the product is ready</Text>
      <Toaster />
    </Container>
  )
}
