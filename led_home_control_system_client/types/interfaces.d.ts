interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id?: number;
}

interface DetailParams {
  id?: string;
}

// interface DetailsProps {
//   required: string;
//   match: match<DetailParams>;
// }