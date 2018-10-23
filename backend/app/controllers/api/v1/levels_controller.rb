class Api::V1::LevelsController < ApplicationController
  def index
    @levels = Level.all
    render(json:@levels, status: :ok)
  end

  def show
    find_level
    render(json: @level, status: :ok)
  end

  # def new
  #
  # end

  def create
    @level = Level.create(level_params)
    render(json: @level, status: :ok)
  end

  # def edit
  #
  # end

  def update

  end

  def destroy

  end

  private

  def find_level
    @level = Level.find_by(id: params[:id])
  end

  def level_params
    params.require(:level).permit(:name, :character_id)
  end
end
