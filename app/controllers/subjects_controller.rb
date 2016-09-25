class SubjectsController < ApplicationController
  def index
    @subjects = current_user.subjects.uniq
  end

  def show
    @subject = Subject.find_by(id:params[:id])
    # unless @subject
      # return redirect_to subjects_path
      respond_to do |format|
        format.html { render :show }
        format.json { render json: @subject}
      end
    # end
  end

end
