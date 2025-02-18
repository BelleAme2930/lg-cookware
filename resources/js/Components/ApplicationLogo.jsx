import Image from "@/Components/Image.jsx";

export default function ApplicationLogo({className}) {
    return (
        <Image src={'/assets/images/logo.png'} alt={'Logo'} className={`w-24 ${className}`}/>
    );
}
