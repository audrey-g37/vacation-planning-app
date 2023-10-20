// project imports
import DraggableDialog from '../DraggableDialog';

const Form = ({
	edit = false,
	isOpen,
	setClosed,
	queryResults,
	itemName,
	collection,
	formData = {}
}) => {
	if (edit) {
		itemName = formData.title;
	}
	const onSubmit = async () => {
		setClosed && setClosed();
		queryResults && (await queryResults());
	};

	return (
		<DraggableDialog
			edit={edit}
			isOpen={isOpen}
			onSubmit={onSubmit}
			setClosed={setClosed}
			itemName={itemName}
			collection={collection}
			formData={formData}
		/>
	);
};

export default Form;
