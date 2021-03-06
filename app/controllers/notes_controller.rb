class NotesController < ApplicationController

  before_action :find_note, only: [:show, :edit, :destroy, :update, :note]

  def new
    @note = Note.new
    @note.build_subject
  end

  def note
    if @note.user_id == current_user.id
      return render json: @note
    end
    return redirect_to home_index_path;
  end

  def create
    @note = Note.new(note_params)
    if params[:note][:subject_attributes][:name].empty?
      flash[:notice] = "Warning, subject name cannot be blank!"
      return render 'notes/new'
    end
    @note.user = current_user
    if @note.save && @note.subject.save
      flash[:notice] = "Successfully created new note."
      # redirect_to subject_note_path(@note.subject,@note)
      respond_to do |format|
        format.json {return render json: @note}
        format.html {return redirect_to subject_note_path(@note.subject,@note) }
      end
    else
      flash[:notice] = "Warning, no fields can be blank!"
      return render '/notes/new'
    end
  end

  def show
    if @note.user_id != current_user.id
      return redirect_to home_index_path
    end
    respond_to do |format|
      format.html {return render :show }
      format.json {return render json: @note}
    end
  end

  def edit
    if @note.user_id != current_user.id
      return redirect_to home_index_path
    end
  end

  def notewithsub
    @note = Note.new
    @note.subject = Subject.find_by(id:params[:id])
  end

  def update
    if params[:note][:subject_attributes][:name].empty?
      flash[:notice] = "Warning, subject name cannot be blank!"
      return redirect_to edit_subject_note_path(@note.subject,@note)
    end
    @note.update(note_params)
    if @note.valid? && @note.subject.valid?
      flash[:notice] = "Successfully updated your note."
      # redirect_to subject_note_path(@note.subject,@note)

      respond_to do |format|
        format.json {return render json: @note}
        format.html {return redirect_to subject_note_path(@note.subject,@note) }
      end
    else
      flash[:notice] = "Warning, no fields can be blank!"
      return redirect_to edit_subject_note_path(@note.subject,@note)
    end
  end

  def destroy
    if @note.user_id == current_user.id
      @note.destroy
    end

    respond_to do |format|
      format.json { return render json: @note }
      format.html { return redirect_to home_index_path }
    end
    
  end

  def find_note
    @note = Note.find_by(id:params[:id])
    unless @note
      redirect_to home_index_path
    end
  end


  private
  def note_params
    params.require(:note).permit(:name,:content,subject_attributes:[:name])
  end
end
