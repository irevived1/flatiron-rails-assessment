class NotesController < ApplicationController

  before_action :find_note, only: [:show, :edit, :destroy, :update]

  def new
    @note = Note.new
    @note.build_subject
  end

  def create
    @note = Note.new(note_params)
    if params[:note][:subject_attributes][:name].empty?
      flash[:notice] = "Warning, subject name cannot blank!"
      return render 'notes/new'
    end
    @note.user = current_user
    if @note.save && @note.subject.save
      redirect_to subject_note_path(@note.subject,@note)
    else
      render '/notes/new'
    end
  end

  def show
  end

  def edit
  end

  def update
    if params[:note][:subject_attributes][:name].empty?
      flash[:notice] = "Warning, subject name cannot blank!"
      return redirect_to edit_subject_note_path(@note.subject,@note)
    end
    @note.update(note_params)
    if @note.valid? && @note.subject.valid?
      redirect_to subject_note_path(@note.subject,@note)
    else
      return redirect_to edit_subject_note_path(@note.subject,@note)
    end
  end

  def destroy
    @note.destroy
    redirect_to home_index_path
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
