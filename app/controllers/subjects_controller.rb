class SubjectsController < ApplicationController
  def index
    @subjects = current_user.subjects.uniq
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @subjects}
    end
  end

  def show
    @subject = Subject.find_by(id:params[:id])
    @note = Note.new(subject:@subject)
    unless @subject
      return redirect_to subjects_path
    end
    @notes = Note.list_note(current_user,@subject)
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @notes}
    end
  end

end
