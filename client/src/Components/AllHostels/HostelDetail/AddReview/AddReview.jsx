import React from 'react';
import "./AddReview.css";
import { useForm } from 'react-hook-form';
import Rating from '@mui/material/Rating';
import { useDispatch } from "react-redux";
import { addHostelReview } from '../../../../features/hostel/registerHostelSlice';

const AddReview = ({hostelId}) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (reviews) => {
        const data = {
           hostelId,
           reviews 
        }
        dispatch(addHostelReview(data))
        setValue('rating', 0);
        setValue('comment', '');
    };
    return (
        <>
            <form className='addReview' onSubmit={handleSubmit(onSubmit)}>
                <h1>Reviews</h1>
                <hr />
                <p>Add Rating</p>
                <input type="hidden" {...register('rating', { required: 'Select Stars and Add Review again' })} />
                <Rating 
                    onChange={(event, newValue) => setValue('rating', newValue)} 
                />
                <div className="reviewError">{errors?.rating?.message}</div>
                <p>Tell your Exprerience</p>
                <textarea 
                  className='addRatingText' 
                  rows="5" 
                  type='text' 
                  placeholder='Best place ever ...'
                  {...register('comment', { required: 'Comment is required' })}
                >
                </textarea>
                <div className="reviewError"> {errors?.comment?.message}</div>
                <button className='addReviewBtn' type='submit'>Add Review</button>
            </form>
        </>
    )
}

export default AddReview