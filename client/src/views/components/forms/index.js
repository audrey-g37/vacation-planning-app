// project imports
import DraggableDialog from '../DraggableDialog';

const Form = ({ edit = false, isOpen, setClosed, itemName, collection, formData }) => {
	if (edit) {
		itemName = formData.title;
	}
	return (
		<DraggableDialog
			edit={edit}
			isOpen={isOpen}
			setClosed={setClosed}
			itemName={itemName}
			collection={collection}
			formData={edit ? formData : {}}
		/>
	);
};

export default Form;
