import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Tailwind } from "@react-email/tailwind";

import { Link } from "@react-email/link";
import { Head } from "@react-email/head";
import { Font } from "@react-email/font";

export const ReceiptMail = () => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            brand: "#007291",
          },
        },
      },
    }}
  >
    <Html className="bg-gray-300">
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Section>
        <Container>
          <Text className="text-5xl text-red-700 font-semibold mb-10">
            kaartenvaneva
          </Text>
        </Container>
        <Container>
          <Text className="text-black text-2xl ">
            Je bestelling is verzonden. Hij komt er zo snel mogelijk aan!
          </Text>

          <Text className="text-black mb-10 text-lg">
            Mocht er iets niet kloppen, neem gerust
            <Link href="mailto:kaartenvaneva@gmail.com"> contact</Link> op!
          </Text>
        </Container>
        <Container>
          <Link
            href="https://localhost:3000"
            className="bg-red-700 px-3 py-2 font-medium leading-4 text-white rounded shadow mb-10"
          >
            Meer kaarten bekijken
          </Link>
        </Container>
      </Section>
    </Html>
  </Tailwind>
);

export default ReceiptMail;
