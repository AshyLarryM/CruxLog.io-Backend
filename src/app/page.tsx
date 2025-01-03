import { Hero } from "@/components/Hero";
import { PageFrame } from "@/components/layouts/PageFrame";

export default function Home() {
	return (
		<PageFrame showNavbar={true}>
			<Hero />
		</PageFrame>
	);
}
