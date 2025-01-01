type Props = {
	name: string;
};

export default function Icon({ name }: Props) {
	return <span className="material-symbols-rounded">{name}</span>;
}
