
interface InterviewHeaderProps {
  title: string;
  description: string;
}

const InterviewHeader = ({ title, description }: InterviewHeaderProps) => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default InterviewHeader;
